import React, {Component} from "react";
import Router from "./Router";
import {Provider} from "react-redux";
import Store from "./common/store";
import {PersistGate} from "redux-persist/integration/react";
import ActivityLoader from "./modules/common/ActivityLoader";

class App extends Component {
    render() {
        return (
            <Provider store={Store.store}>
                <PersistGate loading={<ActivityLoader loading={true}/>} persistor={Store.persistor}>
                    <Router/>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
