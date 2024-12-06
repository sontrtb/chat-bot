

import { ReactElement, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.

interface IBackgroundParticlesProps {
    children: ReactElement
    className?: string
}

const BackgroundParticles = (props: IBackgroundParticlesProps) => {
    const { children, className } = props

    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);


    if (!init) {
        return <div className={className}>
            {children}
        </div>
    }

    return (
        <>
            <Particles
                options={{
                    background: {
                        color: {
                            value: "hsl(var(--background))",
                        },
                    },
                    fpsLimit: 60,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                        },
                        modes: {
                            push: {
                                quantity: 2,
                            },
                            repulse: {
                                distance: 100,
                                duration: 1,
                            },
                        },
                    },

                    particles: {
                        color: {
                            value: "#93c5fd",
                        },
                        links: {
                            color: "#93c5fd",
                            distance: 150,
                            enable: true,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 1,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                height: 800,
                                width: 800
                            },
                            value: 30,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 5 },
                        },
                    },
                    detectRetina: true,
                }}
            />
            <div className={className}>
                {children}
            </div>
        </>
    );
};

export default BackgroundParticles