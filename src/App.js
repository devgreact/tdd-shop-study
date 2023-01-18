import Order from "./pages/order/Order";
import { OrderContextProvider } from "./context/OrderContext";
function App() {
  return (
    <div>
      <OrderContextProvider>
        <Order />
      </OrderContextProvider>
    </div>
  );
}

export default App;
