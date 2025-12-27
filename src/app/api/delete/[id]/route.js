import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://manipirama:mani@cluster0.svr0w6i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export async function DELETE(req, { params }) {
  const { id } = await params;

  if (!id) {
    return new Response(
      JSON.stringify({ message: 'Student ID is required' }),
      { status: 400 }
    );
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db('student-management');
    const students = db.collection('students');

    const result = await students.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ message: 'Student not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Student deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to delete student', error }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
