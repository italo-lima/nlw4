import { useChallenges } from '../contexts/ChallengeContexts';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const { currentExperience, expirenceToNextLevel } = useChallenges();

  const percentToNextLevel =
    Math.round(currentExperience * 100) / expirenceToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0 px</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />
        <span
          className={styles.currentExperience}
          style={{ left: `${percentToNextLevel}%` }}
        >
          {currentExperience} px
        </span>
      </div>
      <span>{expirenceToNextLevel} px</span>
    </header>
  );
}
