// /app/api/students/route.js  (Next.js 13+ App Router)
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://manipirama:mani@cluster0.svr0w6i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export async function GET() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('student-management');
    const students = await db.collection('students').find({}).toArray();
    return new Response(JSON.stringify(students), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Failed to fetch students' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
  }
}
