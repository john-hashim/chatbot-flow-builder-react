import "./App.css";
import FlowArea from "./components/FlowArea/FlowArea";
import NodesPanel from "./components/NodesPanel/NodesPanel";
import TopBar from "./components/TopBar/TopBar";

import { Provider } from "react-redux";
import store from "./store/index";

function App() {
  return (
    <Provider store={store}>
      <div className="chatbot-wrapper">
        <div className="top-bar">
          <TopBar />
        </div>
        <div className="main-content">
          <div className="flow-panel">
            <FlowArea />
          </div>
          <div className="nodes-panel">
            <NodesPanel />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
