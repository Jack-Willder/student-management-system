import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://manipirama:mani@cluster0.svr0w6i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    await client.connect();
    const database = client.db('student-management');
    const admins = database.collection('admin');

    const admin = await admins.findOne({ email });

    
    if (admin && admin.password === password) {
      return new Response(JSON.stringify({ success: true, message: 'Login successful' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ success: false, message: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
  }
}

export async function GET(req) {
  try {
    await client.connect();
    const database = client.db('student-management');
    const users = database.collection('users');

    // Assuming we fetch the first user for simplicity
    const user = await users.findOne();

    if (user) {
      return new Response(JSON.stringify({ name: user.name }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
  }
}