import TeamMember from '../models/TeamMember.js';

const initialTeamMembers = [
  {
    id: 'team-bona',
    name: 'H.E. Dr. SENG Bona',
    title: 'Founder and Chairman',
    roleCategory: 'Executive Leadership',
    highlight: 'Institutional Founder',
    message: 'Visionary architect of BMU University, dedicated to fostering academic excellence, innovation, and global educational standards across Cambodia and beyond.',
    bio: 'Visionary architect of BMU University, dedicated to fostering academic excellence, innovation, and global educational standards across Cambodia and beyond.',
    facebook: 'https://facebook.com/bonamary',
    email: 'bona@bonamary.edu.kh',
    order: 1
  },
  {
    id: 'team-porguech',
    name: 'UNG Porguech',
    title: 'Co-founder and President',
    roleCategory: 'Executive Leadership',
    highlight: 'University President',
    message: 'Guiding the university\'s strategic advancement, institutional integrity, and transformative educational mission for the next generation of global leaders.',
    bio: 'Guiding the university\'s strategic advancement, institutional integrity, and transformative educational mission for the next generation of global leaders.',
    facebook: 'https://facebook.com/bonamary',
    email: 'president@bonamary.edu.kh',
    order: 2
  },
  {
    id: 'team-channareth',
    name: 'VIN Channareth',
    title: 'Vice-president',
    roleCategory: 'University Administration',
    highlight: 'BMU Leadership',
    message: 'Overseeing university operations, strategic development, and institutional growth across all faculties and administrative divisions.',
    bio: 'Overseeing university operations, strategic development, and institutional growth across all faculties and administrative divisions.',
    facebook: 'https://facebook.com/bonamary',
    email: 'channareth@bonamary.edu.kh',
    order: 3
  },
  {
    id: 'team-eves',
    name: 'Ms. Linda Anne Eves',
    title: 'Senior Advisor, Academic Affairs',
    roleCategory: 'Academic Governance',
    highlight: 'BMU Leadership',
    message: 'Advancing curriculum innovation, international accreditation standards, and pedagogical excellence across all undergraduate and postgraduate programs.',
    bio: 'Advancing curriculum innovation, international accreditation standards, and pedagogical excellence across all undergraduate and postgraduate programs.',
    facebook: 'https://facebook.com/bonamary',
    email: 'academics@bonamary.edu.kh',
    order: 4
  },
  {
    id: 'team-claire',
    name: 'Ms. Claire de la Mer',
    title: 'Director of International Collaborations',
    roleCategory: 'Global Diplomacy',
    highlight: 'BMU Leadership',
    message: 'Spearheading worldwide university partnerships, student exchange programs, dual-degree pathways, and international research alliances.',
    bio: 'Spearheading worldwide university partnerships, student exchange programs, dual-degree pathways, and international research alliances.',
    facebook: 'https://facebook.com/bonamary',
    email: 'international@bonamary.edu.kh',
    order: 5
  },
  {
    id: 'team-rhean',
    name: 'Ms. Rhean Ongican',
    title: 'Head of Student Services',
    roleCategory: 'Student Welfare & Success',
    highlight: 'BMU Leadership',
    message: 'Leading comprehensive student support, campus life initiatives, career development services, and international student integration.',
    bio: 'Leading comprehensive student support, campus life initiatives, career development services, and international student integration.',
    facebook: 'https://facebook.com/bonamary',
    email: 'studentservices@bonamary.edu.kh',
    order: 6
  }
];

export const getTeamMembers = async (req, res, next) => {
  try {
    const bonaExists = await TeamMember.findOne({ id: 'team-bona' });
    if (!bonaExists) {
      await TeamMember.deleteMany({ id: { $in: ['team-1', 'team-2'] } });
      for (const item of initialTeamMembers) {
        await TeamMember.findOneAndUpdate({ id: item.id }, { $set: item }, { upsert: true });
      }
    }

    const { roleCategory, search } = req.query;
    let query = {};
    if (roleCategory && roleCategory !== 'All') {
      query.roleCategory = roleCategory;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } }
      ];
    }
    let team = await TeamMember.find(query).sort({ order: 1, createdAt: 1 });

    // Automatic self-healing: if querying all members and orders are unassigned or non-sequential, normalize them
    if (!roleCategory && !search) {
      let needsUpdate = false;
      for (let i = 0; i < team.length; i++) {
        if (team[i].order !== i + 1) {
          team[i].order = i + 1;
          await TeamMember.updateOne({ _id: team[i]._id }, { $set: { order: i + 1 } });
          needsUpdate = true;
        }
      }
      if (needsUpdate) {
        team = await TeamMember.find(query).sort({ order: 1, createdAt: 1 });
      }
    }

    res.status(200).json({ success: true, count: team.length, data: team });
  } catch (error) {
    next(error);
  }
};

export const getTeamMemberById = async (req, res, next) => {
  try {
    const member = await TeamMember.findOne({ id: req.params.id }) || await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    res.status(200).json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
};

export const createTeamMember = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    delete payload._id;
    delete payload.__v;
    if (payload.order === undefined || payload.order === null) {
      const maxOrderMember = await TeamMember.findOne().sort({ order: -1 });
      payload.order = maxOrderMember && typeof maxOrderMember.order === 'number' ? maxOrderMember.order + 1 : 1;
    }
    const member = await TeamMember.create(payload);
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
};

export const updateTeamMember = async (req, res, next) => {
  try {
    let member = await TeamMember.findOne({ id: req.params.id }) || await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    const updatePayload = { ...req.body };
    delete updatePayload._id;
    delete updatePayload.__v;
    const updated = await TeamMember.findOneAndUpdate(
      { id: member.id },
      { $set: updatePayload },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteTeamMember = async (req, res, next) => {
  try {
    let member = await TeamMember.findOne({ id: req.params.id }) || await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    await member.deleteOne();
    res.status(200).json({ success: true, message: 'Team member removed completely' });
  } catch (error) {
    next(error);
  }
};

export const stepReorderTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { direction } = req.body; // 'up' or 'down'
    const allMembers = await TeamMember.find().sort({ order: 1, createdAt: 1 });

    // 1. Ensure all members in the database have clean, sequential 1-indexed order numbers
    for (let i = 0; i < allMembers.length; i++) {
      if (allMembers[i].order !== i + 1) {
        allMembers[i].order = i + 1;
        await TeamMember.updateOne({ _id: allMembers[i]._id }, { $set: { order: i + 1 } });
      }
    }

    // 2. Find the index of the item being moved
    const currentIndex = allMembers.findIndex(m => m.id === id || m._id.toString() === id);
    if (currentIndex === -1) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }

    // 3. Determine the target index
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= allMembers.length) {
      return res.status(400).json({ success: false, message: 'Cannot move further in that direction' });
    }

    // 4. Swap exactly the order indexes between currentMember and targetMember
    const currentMember = allMembers[currentIndex];
    const targetMember = allMembers[targetIndex];

    const tempOrder = currentMember.order; // currentIndex + 1
    const newOrder = targetMember.order;   // targetIndex + 1

    await TeamMember.updateOne({ _id: currentMember._id }, { $set: { order: newOrder } });
    await TeamMember.updateOne({ _id: targetMember._id }, { $set: { order: tempOrder } });

    // 5. Return the newly sorted list
    const updatedList = await TeamMember.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: updatedList.length, data: updatedList });
  } catch (error) {
    next(error);
  }
};
