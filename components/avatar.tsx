import Image from 'next/image'
import styles from '../styles/Avatar.module.css'

export function Avatar({ src, size }: { src: string, size: number }) {
    return (
        <Image
            src={src}
            width={size}
            height={size}
            className={styles.avatar}
            alt={`Your axolittle`}
        />
    )
}