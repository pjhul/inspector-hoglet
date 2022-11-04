export default function List({ classes, children }) {
  return (
    <ul class={`mx-2 ${classes}`}>
      {children}
    </ul>
  )
}