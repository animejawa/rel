import OrderForm from "../OrderForm";

export default function OrderFormExample() {
  return (
    <OrderForm
      onSubmit={async (data) => {
        console.log("Order submitted:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }}
    />
  );
}
