import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Card,Image,Form} from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',
                  isloaded:false,
                  username:'',
                  login:[]
                };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.getUser=this.getUser.bind(this);
  }

   async getUser(username)
  {
    var items;
    let k;
    if(username.length!=0)
    {
    await fetch(`https://api.github.com/search/users?q=${username}&sort=followers&order=desc`)
    .then(res=>res.json())
    .then(res=>{
      k=res;
      
    });
  }
  return k;
    

  }

   async handleChange(event) {
    event.preventDefault()
    this.setState({value: event.target.value});
   var users= await  this.getUser(event.target.value);
  //this.setState({username:user.id})
  try{
    console.log(users);
    
    var items=users.items.map((it)=>
    
    <Card >
      <Card.Content>
    <Image floated="right" size="mini" src={it.avatar_url}></Image>
    <Card.Header>{it.login}</Card.Header>
    </Card.Content>
    </Card>
    );
    
    console.log(items);
    
    this.setState(
      {
        login:items
      }
    )
    }
    catch(e)
    {
      console.log(e);
      
    }
  //  var u=user;

    
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div style={{padding:"20px"}}>
      <h1>Search Github Username</h1>
    <Form>
    <Form.Field>
      <input placeholder='Enter UserName' value={this.state.value} onChange={this.handleChange} />
    </Form.Field>
    </Form>
    
      <div style={{display:"grid", gridTemplateColumns:"auto auto auto"}}>{this.state.login}</div>

      </div>
    );
  }
}

export default App;
