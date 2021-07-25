import Link from 'next/link'
import Container from '@/components/container'
import ButtonLink from '@/components/button-link'
import {
  useSession, signIn, signOut
} from 'next-auth/client'

export default function Nav({ title = 'Perpus' }) {
  const [session, loading] = useSession()
  console.log(session)
  return (
    <Container className="py-4">
      <nav>
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="font-bold text-3xl">{title}</a>
          </Link>
          {session && session.role == "ADMIN" ? <>
            <ButtonLink href="/new">Add Staff</ButtonLink>
          </> : null}
          {session && (session.role == "ADMIN" || session.role == "STAFF") ?
            <>
              <ButtonLink className={'bg-red-500'} href="/new">Member</ButtonLink>
              <ButtonLink href="/new">Authors</ButtonLink>
              <ButtonLink href="/new">Book</ButtonLink>
              <ButtonLink href="/new">Borrowing</ButtonLink>
            </> : null
          }
          {session ?
            <>{session.user.name} as {session.role} <button className="bg-red-700 text-white p-2 rounded uppercase text-sm font-bold" onClick={() => signOut()}>Sign out</button></>
            : <button className="bg-blue-700 text-white p-2 rounded uppercase text-sm font-bold" onClick={() => signIn()}>Sign in</button>}
        </div>
      </nav>
    </Container>
  )
}
