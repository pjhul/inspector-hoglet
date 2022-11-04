export default function ListItem({ children }) {
  return (
    <li class="flex items-center justify-between mt-[1px]">
      {children}
    </li>
  )
}