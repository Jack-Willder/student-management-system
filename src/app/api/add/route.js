import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://manipirama:mani@cluster0.svr0w6i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function POST(request) {
  try {
    const {
      name,
      email,
      className,
      studentId,
      contact,
      attendance,
      status,
    } = await request.json();

    // Basic validation
    if (!name || !email || !className) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields' }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('student-management');
    const students = db.collection('students');

    // Check if student already exists
    const existingStudent = await students.findOne({ email });

    if (existingStudent) {
      return new Response(
        JSON.stringify({ success: false, message: 'Student already exists' }),
        { status: 409 }
      );
    }

    const newStudent = {
      name,
      email,
      class: className,
      contact: contact || '',
      studentId: studentId || '',
      attendance: attendance || 0,
      status: status || 'Active',
      createdAt: new Date(),
    };

    await students.insertOne(newStudent);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Student added successfully',
        student: newStudent,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Add student error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Server error' }),
      { status: 500 }
    );
  }
}
