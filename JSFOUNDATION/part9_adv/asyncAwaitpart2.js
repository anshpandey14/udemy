function fetchPostData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Post Data fetched");
    }, 2000);
  });
}

function fetchCommentData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Comment Data fetched");
    }, 3000);
  });
}

async function getBlogData() {
  try {
    console.log("fetching blog data");
    // const blogData = await fetchPostData();
    // const CommentData = await fetchCommentData();

    // promise all
    const [blogData, CommentData] = await Promise.all([
      fetchPostData(),
      fetchCommentData(),
    ]);
    console.log(blogData);
    console.log(CommentData);
    console.log("fetching completes");
  } catch (error) {
    console.error("Error fetching blog data", error);
  }
}

getBlogData();
