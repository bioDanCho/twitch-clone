import Head from 'next/head';
import HoverableText from '../components/atoms/HoverableText';
import HomeDisplaySection from '../components/organisms/HomeDisplaySection';
import styles from '../styles/Home.module.css';
import categoryData from '../assets/data/channel-categories.json';
import NavBar from '../components/organisms/NavBar';
import Carousel from '../components/organisms/Carousel';
// import liveStreamsData from '../assets/data/live-streams.json';

// export const getStaticPaths = async () => {
//     const res = await fetch('https://jsonplaceholder.typicode.com/users');
//     const data = await res.json();

//     const paths = data.map((user) => {
//         return {
//             params: {
//                 id: user.id.toString(),
//             },
//         };
//     });

//     return {
//         paths: paths,
//         fallback: false,
//     };
// };

export const getStaticProps = async (context) => {
    const res1 = await fetch(`http://localhost:3000/top-streams`);
    const topStreams = await res1.json();
    const res2 = await fetch(`http://localhost:3000/top-games`);
    const topGames = await res2.json();
    const res3 = await fetch(`http://localhost:3000/top-streams/21779`); // league of legends
    const leagueOfLegendsStreams = await res3.json();
    const res4 = await fetch(`http://localhost:3000/top-streams/512710`); // warzone
    const warzoneStreams = await res4.json();

    return {
        props: {
            topStreams: topStreams,
            topGames: topGames,
            leagueOfLegendsStreams: leagueOfLegendsStreams,
            warzoneStreams,
        },
    };
};

export default function Home({
    topStreams,
    topGames,
    leagueOfLegendsStreams,
    warzoneStreams,
}) {
    console.log(topStreams, topGames, leagueOfLegendsStreams);
    return (
        <div className={styles.container}>
            <Head>
                <title>Twitch | Clone</title>
                <meta
                    name='description'
                    content='Generated by create next app'
                />
                <link rel='icon' href='/twitch-favicon.png' />
            </Head>

            <div className={styles.carousel_wrapper}>
                <Carousel liveStreamData={topStreams.data} />
            </div>

            <div className={styles.main_content}>
                <section>
                    <HomeDisplaySection
                        contentData={leagueOfLegendsStreams.data}
                        perLine={3}
                        type={'stream'}
                        headerText={
                            <div className={styles.section_header}>
                                <div
                                    className={styles.pad_right}
                                >{`Recommended`}</div>
                                <HoverableText
                                    text={'League of Legends'}
                                    fontSize={'18px'}
                                    fontWeight={'bold'}
                                    hoverEffects={{
                                        changeColor: true,
                                        addUnderline: true,
                                    }}
                                    initialColor={'#bf94ff'}
                                    hoverColor={'#a970ff'}
                                    handleOnClick={() => {}}
                                />
                                <div
                                    className={styles.pad_left}
                                >{`channels`}</div>
                            </div>
                        }
                        showMore
                    />
                </section>
                <section>
                    <HomeDisplaySection
                        contentData={warzoneStreams.data}
                        perLine={3}
                        type={'stream'}
                        headerText={
                            <div className={styles.section_header}>
                                <div
                                    className={styles.pad_right}
                                >{`Recommended`}</div>
                                <HoverableText
                                    text={'Call of Duty: Warzone'}
                                    fontSize={'18px'}
                                    fontWeight={'bold'}
                                    hoverEffects={{
                                        changeColor: true,
                                        addUnderline: true,
                                    }}
                                    initialColor={'#bf94ff'}
                                    hoverColor={'#a970ff'}
                                    handleOnClick={() => {}}
                                />
                                <div
                                    className={styles.pad_left}
                                >{`channels`}</div>
                            </div>
                        }
                        showMore
                    />
                </section>
                <section>
                    <HomeDisplaySection
                        contentData={categoryData.data}
                        perLine={6}
                        type={'game'}
                        headerText={
                            <div className={styles.section_header}>
                                <HoverableText
                                    text={'Categories'}
                                    fontSize={'18px'}
                                    fontWeight={'bold'}
                                    hoverEffects={{
                                        changeColor: true,
                                        addUnderline: true,
                                    }}
                                    initialColor={'#bf94ff'}
                                    hoverColor={'#a970ff'}
                                    handleOnClick={() => {}}
                                />
                                <div
                                    className={styles.pad_left}
                                >{`we think you'll like`}</div>
                            </div>
                        }
                    />
                </section>
                <section className={styles.navbar_section}>
                    <NavBar />
                </section>
                <section>
                    <HomeDisplaySection
                        contentData={topStreams.data.sort(
                            (a, b) => b.viewer_count - a.viewer_count
                        )}
                        perLine={3}
                        type={'stream'}
                        headerText={
                            <div className={styles.section_header}>
                                <div>{`What's hot`}</div>
                            </div>
                        }
                        showMore
                    />
                </section>
                <section>
                    <HomeDisplaySection
                        contentData={topGames.data}
                        perLine={6}
                        type={'game'}
                        headerText={
                            <div className={styles.section_header}>
                                <div>{`Top Games on Twitch`}</div>
                            </div>
                        }
                    />
                </section>
            </div>
        </div>
    );
}
