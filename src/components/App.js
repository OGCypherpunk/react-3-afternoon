import React, { Component } from 'react';
import axios from "axios"
import './App.css';
import Post from './Post/Post'

import Header from './Header/Header';
import Compose from './Compose/Compose';
class App extends Component {
  constructor(props) {
    super(props);
//state keeps track of all the (____) that we want to (_____)with
    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then( results => { 
      console.log(results)
      this.setState({ posts:results.data })
//how do you know to use::: results.data? --- log the entire "results" object
    });
  }

  updatePost(id ,text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }` , { text }).then( results => {
      this.setState({ posts: results.data });
    });
  }


  deletePost( id ) {
    console.log(this.state.posts,"Delete posts")
      axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then( results => { 
        console.log(results)
        this.setState({ posts: results.data })
    });
  }

  createPost( text ) {
    axios.post('https://practiceapi.devmountain.com/api/posts' , { text }).then( results => {
      this.setState({ posts: results.data })
    }).catch(console.log)
  }



//This is the render method


  render() {
    
    console.log(this.state)
    const { posts } = this.state;

    const postList = posts.map( post  => {
// console.log(post)
      return <Post 

//key is a the unique identifier special to React --- "black magic"
                  key = {post.id}
//These are props
                  text ={post.text} 
                  date= {post.date}
                  id= { post.id }
                  updatePostFn = { this.updatePost }
                  deletePostFn = { this.deletePost }
//why use this.updatePost???
//why duplicate id???
//what is the difference between key and the others? Why is key speacial?
              /> 
    })


// console.log(postList)

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn = { this.createPost } />
          {postList}

        </section>
      </div>
    );
  }
}

export default App;
