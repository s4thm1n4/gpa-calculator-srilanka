// app/components/Header.tsx

'use client';

import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { universities } from '@/lib/universities'; // Import the dynamic list

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/', current: pathname === '/' },
    { name: 'About', href: '/about', current: pathname === '/about' },
  ];

  return (
    <Disclosure as="nav" className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-200">
      {({ open }: { open: boolean }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Logo and Desktop Nav */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <h1 className='text-gray-800 text-lg font-bold'>GPA Calculator Sri Lanka</h1>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 items-center">
                    {/* Standard Links */}
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                    
                    {/* Universities Dropdown for Desktop */}
                    <Dropdown universities={universities} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <div className="border-t border-gray-200 pt-4 mt-4">
                 <h3 className="px-3 text-xs font-semibold uppercase text-gray-500">Universities</h3>
                 <div className="mt-1 space-y-1">
                  {universities.map((uni) => (
                      <Disclosure.Button
                        key={uni.id}
                        as={Link}
                        href={`/university-gpa-calculator/${uni.id}`}
                        className="block rounded-md py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      >
                        {uni.shortName}
                      </Disclosure.Button>
                  ))}
                 </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

// Dropdown Component with hover fix
function Dropdown({ universities }: { universities: { id: string; name: string; shortName: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium flex items-center"
      >
        <span>Universities</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      {/* FIX: Removed mt-2 class that caused the hover gap */}
      {isOpen && (
        <div className="absolute left-0 w-72 origin-top-left rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 pt-2">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {universities.map(uni => (
              <Link
                key={uni.id}
                href={`/university-gpa-calculator/${uni.id}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {uni.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
