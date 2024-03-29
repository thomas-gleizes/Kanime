import React, { useMemo, useRef, useState } from 'react'
import { ChevronDownIcon, MenuIcon } from '@heroicons/react/solid'
import { Transition } from '@headlessui/react'
import classnames from 'classnames'
import Link from 'next/link'

import { useUserContext } from 'context/auth.context'
import { useLayoutContext } from 'context/layout.context'
import { routes } from 'resources/routes'
import { useFocus, useMouseOvered } from 'hooks'
import DropDownByRef from 'components/layouts/DropDownByRef'
import SearchBar from 'components/common/SearchBar'
import { DEFAULT_USER_MEDIA } from 'resources/constants'

const DropDownItem: Component<{ href: string; children: ReactNode }> = ({ href, children }) => (
  <Link href={href} className="block w-full py-1.5 px-2 hover:bg-gray-100">
    {children}
  </Link>
)

const DropDownExplore: Component = () => {
  const button = useRef<HTMLButtonElement>(null)

  return (
    <div>
      <div>
        <button ref={button} type="button" className="text-white flex group">
          Explore
          <i className="my-auto z-10">
            <ChevronDownIcon className="h-4 w-4 transform transition rotate-90 group-focus:rotate-0" />
          </i>
        </button>
      </div>
      <DropDownByRef innerRef={button}>
        <div className="absolute top-3 left-0 py-1 w-32 bg-white ring-1 ring-black ring-opacity-5 text-gray-700 outline-none rounded-sm shadow-lg divide-y">
          <DropDownItem href={routes.animes.list}>Animes</DropDownItem>
          <DropDownItem href={routes.animes.list}>Mangas</DropDownItem>
          <DropDownItem href={routes.animes.list}>Sagas</DropDownItem>
        </div>
      </DropDownByRef>
    </div>
  )
}

const Header: Component = () => {
  const { user, isLogin, signOut } = useUserContext()
  const {
    scrollHeight,
    activeTransparentState: [activeTransparent],
    header,
    globalLoadingPercent
  } = useLayoutContext()

  const headerRef = useRef(null)
  const avatarRef = useRef<HTMLImageElement>(null)

  const [extend, setExtend] = useState<boolean>(false)

  const isMouseOverHeader = useMouseOvered(headerRef)
  const isFocusedHeader = useFocus(headerRef)

  const headerTransparent = useMemo<boolean>(() => {
    if (activeTransparent && !isMouseOverHeader && !isFocusedHeader) return scrollHeight < 250
    else return false
  }, [activeTransparent, isMouseOverHeader, isFocusedHeader, scrollHeight])

  if (header.hiddenHeader) return null

  return (
    <header ref={headerRef} className="h-header">
      <div
        className={classnames(
          'z-50 fixed top-0 w-full shadow-lg select-none transition-all duration-500 ease-in-out'
        )}
      >
        <div className="relative">
          {/*large*/}
          <div
            className={classnames(
              'hidden md:block w-full h-header px-5 transform duration-300 ease-in-out',
              headerTransparent ? 'bg-opacity-30 bg-black' : 'bg-primary'
            )}
          >
            <div className="flex items-center justify-between h-[95%] space-x-5 my-auto max-w-[1200px] w-full mx-auto">
              <div className="flex items-center space-x-8">
                <div className="w-fit">
                  <Link
                    href={routes.home}
                    className="cursor-pointer font-gang-of-three text-xl text-white"
                  >
                    {process.env.NEXT_PUBLIC_APP_NAME}
                  </Link>
                </div>
                <nav className="flex justify-start space-x-4 w-fit">
                  <div>
                    <DropDownExplore />
                  </div>
                  <span>
                    <Link href={routes.forum} className="text-white">
                      Discussion
                    </Link>
                  </span>
                  <span>
                    <Link href={routes.feedback} className="text-white">
                      Feedback
                    </Link>
                  </span>
                  {isLogin && user.isAdmin ? (
                    <span className="mx-3">
                      <Link href={routes.admin} className="text-white">
                        Admin
                      </Link>
                    </span>
                  ) : null}
                </nav>
              </div>
              <div className="flex justify-end w-full max-w-[700px] my-auto">
                <div className="max-w-lg w-full">
                  <SearchBar transparent={headerTransparent} />
                </div>
                <div>
                  {!isLogin ? (
                    <div className="flex items-center space-x-3 ml-4 justify-around text-white h-full my-auto">
                      <Link href={routes.authentification.signIn} className="cursor-pointer">
                        Connexion
                      </Link>
                      <Link href={routes.authentification.register} className="cursor-pointer">
                        Inscription
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full ml-4">
                      <div className="cursor-pointer" ref={avatarRef}>
                        <img
                          className="rounded-full h-[28px]"
                          src={user.avatarPath || DEFAULT_USER_MEDIA.avatar}
                          alt="avatar"
                        />
                      </div>
                      <div>
                        <DropDownByRef innerRef={avatarRef}>
                          <div className="absolute py-1 top-6 right-0 text-right w-40 bg-white ring-1 ring-black ring-opacity-5 text-gray-700 z-50 outline-none rounded-sm shadow-lg divide-y">
                            <DropDownItem href={routes.users.page(user.slug)}>
                              Mon profile
                            </DropDownItem>
                            <DropDownItem href={routes.users.settings(user.slug)}>
                              Settings
                            </DropDownItem>
                            <div onClick={signOut}>
                              <span className="block w-full py-1.5 px-2 hover:bg-gray-100">
                                Déconnexion
                              </span>
                            </div>
                          </div>
                        </DropDownByRef>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/*small*/}
          <div className="block md:hidden h-header">
            <div className="h-full bg-primary py-1 -z-10 flex justify-between">
              <div className="w-2/3  px-5 my-auto">
                <Link
                  href={routes.home}
                  className="cursor-pointer font-gang-of-three font-bold text-2xl text-white"
                >
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </Link>
              </div>
              <div className="w-1/3 m-auto px-5 flex justify-end">
                <i onClick={() => setExtend(!extend)}>
                  <MenuIcon className="text-white hover:text-gray-200 cursor-pointer w-8" />
                </i>
              </div>
            </div>
            <Transition
              show={extend}
              enter="transition ease-out duration-200"
              enterFrom="transform -translate-y-full"
              enterTo="transform translate-y-0"
              leave="transition ease-in duration-100"
              leaveFrom="transform translate-y-0"
              leaveTo="transform -translate-y-full"
            >
              <div className="flex z-10 flex-col py-2 px-4 bg-primary">
                <div className="pb-2 border-b-2 border-b-white">
                  <SearchBar transparent={false} />
                </div>
                <div className="flex flex-col space-y-4 my-3">
                  <nav className="flex flex-col space-y-2 justify-evenly border-b border-b-white border-opacity-50 pb-3">
                    <div className="text-lg font-medium">
                      <DropDownExplore />
                    </div>
                    <div>
                      <Link
                        href={routes.forum}
                        className="text-white text-lg font-medium"
                        onClick={() => setExtend(false)}
                      >
                        Discussion
                      </Link>
                    </div>
                    <div>
                      <Link
                        href={routes.feedback}
                        className="text-white text-lg font-medium"
                        onClick={() => setExtend(false)}
                      >
                        Feedback
                      </Link>
                    </div>
                  </nav>
                  <nav className="flex flex-col space-y-2 justify-evenly">
                    {!isLogin ? (
                      <>
                        <div>
                          <Link
                            href={routes.authentification.signIn}
                            className="text-white text-lg font-medium"
                            onClick={() => setExtend(false)}
                          >
                            Connexion
                          </Link>
                        </div>
                        <div>
                          <Link
                            href={routes.authentification.register}
                            className="text-white text-lg font-medium"
                            onClick={() => setExtend(false)}
                          >
                            Inscription
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <Link
                            href={routes.users.page(user.slug)}
                            className="text-white text-lg font-medium"
                            onClick={() => setExtend(false)}
                          >
                            Mon profile
                          </Link>
                        </div>
                        <div>
                          <Link
                            href={routes.users.settings(user.slug)}
                            className="text-white text-lg font-medium"
                            onClick={() => setExtend(false)}
                          >
                            Paramètres
                          </Link>
                        </div>
                        <div>
                          <span
                            className="text-white text-lg font-medium"
                            onClick={() => {
                              signOut()
                              setExtend(false)
                            }}
                          >
                            Déconnexion
                          </span>
                        </div>
                      </>
                    )}
                  </nav>
                </div>
              </div>
            </Transition>
          </div>
        </div>
        {globalLoadingPercent ? (
          <div className="w-full h-[3px] absolute bottom-0 bg-gradient-to-r from-amber-600 to-red-500">
            <div
              style={{ width: `${100 - globalLoadingPercent}%` }}
              className="h-full bg-primary absolute right-0"
            />
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default Header
