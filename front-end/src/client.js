/* sanity configuration */
import {createClient} from '@sanity/client';

export const client = createClient({
    projectId: '12bn7nhe',
    dataset: 'production',
    apiVersion: '2023-05-13',
    useCdn: true,
    token: 'skmGkumJ7FBkBwnwCe7iyWztxiDjjAkqNuCMOha9Q3MHPRKLstmerCLotaRpTWeVNHomL6JbYApydKa33ayfeO3BGwJzARBJ4mJH5LoIjLGraeyz0JIrp68d6qPOK1AhqJEPvC0QGO8D35haIyXZj1t7CNIPF5A68g7eHew7rM04hq2nam88'
});

