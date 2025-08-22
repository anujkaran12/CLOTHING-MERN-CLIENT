import img from '../../../Assets/emptyCart.png'
import './EmptyCart.css'
const EmptyCart = ({message, onShopNow}) => {
  return (
    <div className="cart-empty">
      <img
        src={img}
        alt="Empty Cart"
        className="cart-empty-img"
      />
      <h2>Your Cart is Empty</h2>
      <p>{message || "Looks like you haven’t added anything to your cart yet."}</p>

      
    </div>
  )
}

export default EmptyCart