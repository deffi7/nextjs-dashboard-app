"use client";

import { usePathname } from 'next/navigation';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Início', href: '/dashboard' },
  { name: 'Usuários', href: '/dashboard/usuarios/create' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="size-8"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={pathname === item.href ? 'page' : undefined}
                        className={classNames(
                          pathname === item.href
                            ? 'bg-gray-900 text-white border-b-2 border-indigo-500 shadow-sm'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200'
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={classNames(
                    pathname === item.href
                      ? 'bg-gray-900 text-white border-b-2 border-indigo-500 shadow-sm'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200'
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>

        <header className="relative bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"></div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
}