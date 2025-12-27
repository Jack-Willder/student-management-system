import { MongoClient, ObjectId } from "mongodb";

const uri = 'mongodb+srv://manipirama:mani@cluster0.svr0w6i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export async function PUT(req, { params }) {
  const { id } = await params;
  
  try {
    const body = await req.json();

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("student-management");
    const students = db.collection("students");

    const result = await students.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: body.name,
          email: body.email,
          studentId: body.studentId,
          class: body.class,
          contact: body.contact,
          attendance: Number(body.attendance),
          status: body.status,
        },
      }
    );

    await client.close();

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ message: "Student not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Student updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
