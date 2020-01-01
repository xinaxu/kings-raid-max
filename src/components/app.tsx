import React from "react"
import {Nav, INavLink} from "office-ui-fabric-react/lib/Nav";
import ClassBuffConfiguration from "./class-buff-configuration";
import ArtifactConfiguration from "./artifact-configuration";
import HeroConfiguration from "./hero-configuration";
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
initializeIcons();

class App extends React.Component {
    constructor(props: Readonly<never>) {
        super(props);
        this.onLinkClick = this.onLinkClick.bind(this);
    }

    onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
        console.log(ev);
        console.log(item);
    }
    
    render() {
        return (
            <div>
                <Nav
                    styles={{
                        root: {
                            width: 200,
                            overflowY: 'auto'
                        }
                    }}
                    onLinkClick={this.onLinkClick}
                    groups={[
                        {
                            links: [
                                {
                                    name: 'Class Buff',
                                    url: '#class_buff',
                                    links: [
                                        {
                                            name: 'Tank',
                                            url: '#class_buff/tank',
                                            key: 'class_buff/tank'
                                        },
                                        {
                                            name: 'Priest',
                                            url: '#class_buff/priest',
                                            key: 'class_buff/priest'
                                        },
                                    ],
                                    isExpanded: true
                                },
                            ]
                        }
                    ]}
                />
                <ClassBuffConfiguration/>
                <ArtifactConfiguration/>
                <HeroConfiguration/>
            </div>
        );
    }
}

export default App