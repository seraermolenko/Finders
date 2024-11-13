// functions for interacting with the postings database

export async function signup(userName, pass) {
  try {
    const url = "https://finders.sodavault.co/api/v1/auth/register";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": userName,
        "password": pass
      }),
    });
    const user = await response.json();
    console.log(user);
    return user;
  }
  catch (error) {
    console.error(error.message);
  }

}

export async function signin(userName, pass) {
  try {
    const url = "https://finders.sodavault.co/api/v1/auth/login";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": userName,
        "password": pass
      }),
    });
    const user = await response.json();
    console.log(user);
    return user;
  } catch (error) {
    console.error(error.message);
  }
}


//gets all postings
export async function getPostings() {
  const url = "https://finders.sodavault.co/api/v1/postings";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const postingsArray = await response.json();
    console.log(postingsArray);
    return postingsArray;
  } catch (error) {
    console.error(error.message);
  }
}

//takes in a dictionary representing a new posting {title, content}
export async function uploadPosting(userId, Posting) {
  try {
    console.log(Posting);
    console.log(userId);
    const url = `https://finders.sodavault.co/api/v1/users/${userId}/postings`;
    console.log(url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Posting),
    });
    const newPosting = await response.json();

    return newPosting;
  } catch (error) {
    console.error(error.message);
  }
}


export async function deletePosting(userId, postingId) {
  try {
    const url = `https://finders.sodavault.co/api/v1/users/${userId}/postings/${postingId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const deletedPosting = await response.json();

    return deletedPosting;
  } catch (error) {
    console.error(error.message);
  }
}



