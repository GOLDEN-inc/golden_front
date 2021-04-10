// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';

// import { getPosts } from '../../actions/getPosts';

// import Nav from '../Navbar/Nav';

// // import firebase from "../../firebase/config";

// import './Home.css';

// const Home = (props) => {
//   const [userState, setUserState] = useState(null);

//   // const getPostsSelector = useSelector((state) => state.getPosts);
//   const dispatch = useDispatch();
//   // const getPostsAction = () => dispatch(getPosts());

//   useEffect(() => {
//     // getPostsAction();
//   }, []);

//   useEffect(() => {
//     // firebase.getUserState().then((user) => {
//     //     setUserState(user);
//     // });
//   });

//   return (
//     <React.Fragment>
//       <Nav />{' '}
//       {/* <div className="posts">
//                 {getPostsSelector.posts.map((post) => {
//                     return (
//                         <div className="post" key={post.id}>
//                             <div className="single">
//                                 <img src={post.data.cover} />
//                             </div>
//                             <Link to={"post/" + post.id}>
//                                 <p className="post-title">{post.data.title}</p>
//                             </Link>
//                             <p className="post-content">{post.data.content}</p>
//                             <a
//                                 className="link"
//                                 target="_blank"
//                                 href={post.data.link}
//                             >
//                                 {post.data.link}
//                             </a>
//                         </div>
//                     );
//                 })}
//             </div> */}{' '}
//     </React.Fragment>
//   );
// };

// export default Home;
