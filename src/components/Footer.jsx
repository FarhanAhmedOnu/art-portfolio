export default function Footer() {
  return (
    <footer className="py-8 text-center border-t border-gray-700 mt-12">
      <p className="text-gray-500 text-sm">
        © {new Date().getFullYear()} My Art Portfolio — Built with ❤️ using React & Tailwind
      </p>
    </footer>
  );
}
