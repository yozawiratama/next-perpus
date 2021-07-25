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
          {session ? <>{session.user.name} as {session.role} <button onClick={() => signOut()}>Sign out</button></> : <button onClick={() => signIn()}>Sign in</button>}
          {session && session.role == "ADMIN" ? <>
            <ButtonLink href="/new">Add Staff</ButtonLink>
          </> : null}
          {session && (session.role == "ADMIN" || session.role == "STAFF") ?
            <>
              <ButtonLink href="/new">Member</ButtonLink>
              <ButtonLink href="/new">Authors</ButtonLink>
              <ButtonLink href="/new">Book</ButtonLink>
              <ButtonLink href="/new">Borrowing</ButtonLink>
            </> : null
          }
        </div>
      </nav>
    </Container>
  )
}
