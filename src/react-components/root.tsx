import * as React from "react";
import {Heading} from './heading';
import {Palette} from './palette';

import './style/index.css';
import './style/menu-left.css';
import './style/menu-top.css';



export function Root() {
    return (
        <div className="root">


            <nav className="top">
                <div className="left">
                    <Heading/>
                </div>
                {/*<ul>
                    <li>Menu 1</li>
                    <li>Menu 2</li>
                    <li>Menu 3</li>
                </ul>
                <div className="right">

                    <button>Uložit</button>

                </div>*/}
            </nav>




            <nav className="left">
                <Palette/>
            </nav>



            <footer>
                footer
            </footer>


        </div>
    )
};