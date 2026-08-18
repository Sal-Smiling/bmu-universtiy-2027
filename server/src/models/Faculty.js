import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String }, // Base64 string for faculty cover photo
    deanName: { type: String, required: true },
    deanPhoto: { type: String }, // Base64 string for photo
    deanMessage: { type: String, required: true },
    scope: { type: String, default: 'National Academic Programs' },
    majors: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String },
        degree: { type: String, default: 'Undergraduate' },
        duration: { type: String, default: '4 Years' },
        tuition: { type: String, default: '$500 / Year' },
        rating: { type: String, default: '4.9' },
        studentsEnrolled: { type: String, default: '150+' },
        careerPathways: [{ type: String }],
        curriculumHighlights: [{ type: String }],
        curriculumSemesters: [
          {
            semesterName: { type: String },
            courses: [
              {
                code: { type: String },
                title: { type: String },
                credits: { type: String }
              }
            ]
          }
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Faculty = mongoose.model('Faculty', facultySchema);

export default Faculty;
