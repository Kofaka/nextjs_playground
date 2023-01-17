import { useQuery } from '@apollo/client';
import Image from 'next/image';
import moment from 'moment';
// Api
import { GET_CAPSULES } from 'api/capsules/queries';
// Types
import {
  Capsules,
  Capsules_capsules,
  CapsulesVariables,
} from 'api/capsules/types/Capsules';
// Styles
import styles from './HomePage.module.scss';

const HomePage = (): JSX.Element => {
  const { data, loading } = useQuery<Capsules, CapsulesVariables>(
    GET_CAPSULES,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        sort: 'original_launch',
        order: 'descending',
      },
    }
  );

  const getCapsules = (): Partial<Capsules_capsules>[] => {
    const capsules: Partial<Capsules_capsules>[] = [];

    data?.capsules?.map((capsule) => capsule && capsules.push(capsule));

    return capsules.sort((a, b) =>
      a?.id && b?.id ? a.id.localeCompare(b.id) : -1
    );
  };

  return (
    <main className={styles.root}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div className={styles.thirteen}>
          <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and&nbsp;API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Discover and deploy boilerplate example Next.js&nbsp;projects.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL
            with&nbsp;Vercel.
          </p>
        </a>
      </div>

      <div>
        <h2>SpaseX landings</h2>
        <br />
        <ul>
          {loading
            ? 'Wait a while … '
            : getCapsules().map(({ id, type, landings, original_launch }) => (
                <li key={id}>
                  The capsule <i>{`"#${id} ${type}"`}</i> has <b>{landings}</b>{' '}
                  landings,
                  {' which was planned to launch on '}
                  <b>{moment(original_launch).format('LL')}</b>
                </li>
              ))}
        </ul>
      </div>
    </main>
  );
};

export default HomePage;
