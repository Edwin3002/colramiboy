"use client"
import React, { useState } from 'react';

interface DropdownMenuProps {
  items: string[]; // Una lista de elementos a mostrar en el menú
  onItemClick?: (item: string) => void; // Función opcional que se ejecuta al hacer clic en un item
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para mostrar/ocultar el dropdown

  // Toggle el estado del dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Manejar clic en un item del dropdown
  const handleItemClick = (item: string) => {
    if (onItemClick) {
      onItemClick(item);
    }
    setIsOpen(false); // Cerrar el dropdown después de seleccionar un item
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Menu
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          id="dropdown"
          className="z-10 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {items.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  onClick={() => handleItemClick(item)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
