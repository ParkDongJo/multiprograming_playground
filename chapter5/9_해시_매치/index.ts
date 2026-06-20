import { indexBy } from "./indexBy";
import { groupBy } from "./groupBy";

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Jim" },
];

const posts = [
  { id: 1, title: "Hello", userId: 1 },
  { id: 2, title: "World", userId: 2 },
  { id: 3, title: "Hello", userId: 3 },
];


const userById = indexBy(user => user.id, users);

const postWithUsers = posts.map(post => ({
  ...post,
  user: userById[post.userId],
}));

console.log(postWithUsers);


const comments = [
  { id: 1, text: "Hello", postId: 1 },
  { id: 2, text: "World", postId: 2 },
  { id: 3, text: "Hello", postId: 3 },
];

const commentByPostId = groupBy(comment => comment.postId, comments);

const postWithComments = posts.map(post => ({
  ...post,
  comments: commentByPostId[post.id] || [],
}));

console.log(postWithComments);