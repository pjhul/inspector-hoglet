export default function Header({ children }) {
  return (
    <header>
      <h3 class="bg-light-gray rounded-sm px-2">
        {children}
      </h3>
    </header>
  )
}