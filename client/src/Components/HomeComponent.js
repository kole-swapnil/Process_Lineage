import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
import '../App.css'
import { Container, Row, Col,Card,CardImg} from 'reactstrap';



class Home extends Component{
    constructor(props){
        super(props);
    }

   
    render(){
      
      return(
        <React.Fragment >
          
                <div className="bg">
                    <Container>
                    <div className="inner header">
                        <h6 style={{ color: 'white'}}>SignIn to grab exciting offers and in-time deliveries</h6>
                    </div>
                    <Card style={{marginTop: 30, marginBottom:40}}>
                      <CardImg top width="80%" src="https://www.cined.com/content/uploads/2020/05/Dell-XPS-15-17-featured.jpg"/>
                    </Card>
                    <Card style={{marginTop: 30}}>
                      <CardImg top width="80%" src="https://cdn.pocket-lint.com/r/s/970x/assets/images/124434-phones-buyer-s-guide-best-android-phones-2017-these-are-the-androids-you-re-looking-for-image1-kiqmufsv8x.jpg" />
                    </Card>
                    <Card style={{marginTop: 30 }}>
                      <CardImg top width="80%" src="https://www.cgcomputers.co.uk/data/files/lenovo.jpg" />
                    </Card>
                    <Card style={{marginTop: 30 }}>
                      <CardImg top width="80%" src="https://i2.wp.com/www.smartprix.com/bytes/wp-content/uploads/2020/06/Mi-laptop.jpg?fit=1200%2C675&ssl=1"/>
                    </Card>
                    <Card style={{marginTop: 30}}>
                      <CardImg top width="80%" src="https://images.anandtech.com/doci/11455/dell_inspiron_7000_1.jpg"/>
                    </Card>
                    <Card style={{marginTop: 30}}>
                      <CardImg top width="80%" src="http://static4.businessinsider.com/image/598a08ec76084a2b198b513a-1190-625/this-eye-catching-new-phone-out-of-china-is-a-great-example-of-where-the-future-of-smartphones-is-headed.jpg"/>
                    </Card>
                    
                    </Container>
                </div>
                
                
        
        </React.Fragment>
        );
      
    }

}

export default Home;