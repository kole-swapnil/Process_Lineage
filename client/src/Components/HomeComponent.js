import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
//import AliceCarousel from 'react-alice-carousel';
//import "react-alice-carousel/lib/alice-carousel.css";
import '../App.css'

class Home extends Component{
    constructor(props){
        super(props);
    }

   
    render(){
      
        return(
            <React.Fragment>
                <div className="inner header">
                    <h6>SignIn to grab exciting offers and in-time deliveries</h6>
                      <div className="img-1">
                        <img src="https://cdn.pocket-lint.com/r/s/970x/assets/images/141307-laptops-review-microsoft-surface-laptop-review-image1-lzayz9jcmq.jpg"></img>
                      </div>
                      <div className="img-2">
                        <img src="https://www.cined.com/content/uploads/2020/05/Dell-XPS-15-17-featured.jpg"></img>
                      </div>
                        <div className="img-3">
                        <img src="https://d2pa5gi5n2e1an.cloudfront.net/ph/images/article/5170/img-1.jpg"></img>
                        </div>
                        <div className="img-4">
                            <img src="https://tse1.mm.bing.net/th?id=OIP.DYmDXHlvuoA43eCoX7ZPYQHaE8&pid=Api&P=0&w=271&h=181"></img>
                        </div>

                    </div>
                
                
            
            </React.Fragment>
        )

    }

}

export default Home;