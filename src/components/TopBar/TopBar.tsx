import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearSelectedNode } from '../../store/slices/flowSlices';

function TopBar() {
  const nodes = useSelector((state: RootState) => state.flow.nodes);
  const edges = useSelector((state: RootState) => state.flow.edges);
  const dispatch = useDispatch();
  
  const handleSave = () => {
    dispatch(clearSelectedNode());
    if (nodes.length > 1) {
      let nodesWithNoIncomingEdges = nodes.filter(node => 
        !edges.some(edge => edge.target === node.id)
      );

      if (nodesWithNoIncomingEdges.length > 1) {
        toast(' Error: More than one node without incoming connections!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          theme: "dark",
          });
        return;
      }
    }
    toast('Flow Saved successfully', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      theme: "dark",
    });
  };
  return (
    <div className='topbar-wrapper' onClick={handleSave}>
        <button className='save-btn'>Save Changes</button>
        <ToastContainer />
    </div>
  )
}

export default TopBar