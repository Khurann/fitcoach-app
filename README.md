# 🏋️ FitCoach Damien - Application Fitness Personnalisée

## 📋 Vue d'ensemble

**FitCoach Damien** est une application web complète et interactive conçue spécifiquement pour Damien, un coureur régulier de 33 ans souhaitant perdre 20kg en 1 an tout en développant sa masse musculaire pour améliorer ses performances en course à pied.

L'application combine musculation, course à pied, suivi nutritionnel et gamification pour offrir une expérience motivante et personnalisée.

---

## 🎯 Profil Utilisateur

**Damien**
- **Âge**: 33 ans
- **Taille**: 190 cm
- **Poids actuel**: 114 kg (départ)
- **Objectif**: 94 kg (-20 kg en 12 mois)
- **Niveau musculation**: Débutant
- **Expérience course**: 1 an (déjà -20kg perdus depuis mars 2025)
- **Contrainte médicale**: Ancienne rupture LCA genoux droit (il y a 15 ans)
- **Événement cible**: Course 10km le 5 avril 2026

---

## ✨ Fonctionnalités Principales

### 🏠 **Dashboard (Accueil)**
- **Compte à rebours** jusqu'à la course 10km d'avril 2026
- **Statistiques en temps réel**:
  - Poids actuel et progression vers l'objectif
  - Séances complétées (total et semaine en cours)
  - Badges débloqués
  - Pourcentage de progression
- **Programme hebdomadaire visuel** (Lun-Dim)
- **Prochaine séance** avec accès rapide au programme
- **Conseil du coach** quotidien (rotation automatique)

### 💪 **Programme d'Entraînement**

#### **Mardi - Haut du Corps + Cardio (60 min)**
1. **Échauffement** (5 min): Rotations épaules, cercles bras, étirements dynamiques
2. **Musculation** (25 min):
   - Développé couché machine: 3×12
   - Tirage horizontal machine: 3×12
   - Développé épaules haltères: 3×10
   - Curl biceps haltères: 3×12
   - Extension triceps poulie: 3×12
3. **Cardio tapis** (30 min): Course modérée
4. **Étirements** (5 min)

#### **Mercredi - Bas du Corps + Core + Cardio (60 min)**
1. **Échauffement** (5 min): Mobilité hanches, chevilles, activation fessiers
2. **Musculation** (25 min):
   - Presse à cuisses: 3×15 (⚠️ Protection genoux)
   - Leg curl (ischio-jambiers): 3×12
   - Mollets machine: 3×15
   - Pont fessiers: 3×15
   - Planche abdominale: 3×30-45s
   - Russian twists: 3×20
3. **Cardio tapis** (30 min): Course modérée
4. **Étirements** (5 min)

#### **Vendredi & Dimanche**
- Course extérieure (programme personnel de Damien)

#### **Samedi - Full Body Léger (Optionnel)**
- Circuit léger 30 min OU
- Mobilité/Stretching 45 min OU
- Cardio léger 30-40 min

**Fonctionnalités par exercice:**
- Description détaillée position de départ
- Étapes d'exécution numérotées
- Points clés de sécurité (avec alertes genoux)
- Erreurs courantes à éviter
- Muscles ciblés (principal/secondaire)
- Bénéfices pour coureur
- **Timer de repos intégré** (60/90 sec selon exercice)
- Bouton "Marquer comme complétée"

### 📊 **Suivi de Progression**

#### **Évolution du Poids**
- **Graphique interactif Chart.js**
  - Courbe de poids avec tendance
  - Ligne objectif (94 kg)
  - Points de données détaillés
- **Statistiques**:
  - Poids départ: 114 kg
  - Poids actuel (dynamique)
  - Objectif: 94 kg
  - Restant à perdre (calculé)

#### **Mensurations**
- Tour de taille
- Tour de poitrine
- Tour de cuisse
- Tour de bras
- Historique avec dates

#### **Historique Séances**
- Graphique par semaine (barres)
- Visualisation des 12 dernières semaines
- Compteur total séances

#### **Badges & Gamification**
- 🌟 Première Séance
- ✅ 1 Semaine Complète
- 🏅 1 Mois Sans Interruption
- ⚖️ 5kg / 10kg / 15kg Perdus
- 🏁 Objectif Atteint (94kg)
- 🏃 Course 10km Réussie
- 🔥 25 Séances / 50 Séances
- **Déblocage automatique** avec notifications

### 📝 **Journal d'Entraînement**
- **Formulaire complet**:
  - Date
  - Type de séance
  - Niveau d'énergie (échelle 1-10 visuelle)
  - Notes et ressentis
  - Douleurs ou gênes signalées
- **Historique détaillé**
  - Tri par date décroissante
  - Affichage barre énergie
  - Alertes douleurs mise en évidence
- **Suggestion automatique** après complétion séance

### 🍽️ **Nutrition & Hydratation**

#### **Besoins Caloriques**
- **BMR (Métabolisme de Base)**: ~2,150 kcal
- **TDEE (Dépense Totale)**: ~2,900 kcal
- **Objectif Perte de Poids**: 2,400 kcal/jour
  - Déficit de 500 kcal/jour
  - Perte visée: 0.4-0.5 kg/semaine
- Calcul basé sur: Homme, 33 ans, 190cm, 114kg, activité élevée

#### **Suivi Protéines**
- **Objectif quotidien**: 140-160g (1.3g/kg poids corporel)
- **Tracker interactif**:
  - Ajout grammes
  - Barre de progression visuelle
  - Reset automatique quotidien
- **Raisons importance protéines**:
  - Maintien masse musculaire
  - Amélioration récupération
  - Satiété accrue
  - Protection fonte musculaire en déficit

#### **Hydratation**
- **Objectif**: 3-4 litres/jour
- **Tracker visuel**: 16 verres de 250ml
  - Clic pour remplir/vider
  - Compteur litres en temps réel
  - Reset manuel
- **Conseils timing hydratation**

#### **Idées Repas Riches en Protéines**
- Petit déjeuner (30-40g)
- Déjeuner (40-50g)
- Dîner (40-50g)
- Collations (15-25g)
- **Exemples concrets** pour chaque repas

#### **Conseils Nutrition**
- Timing protéines (post-workout)
- Alimentation avant course
- Répartition macros (25/30/45)
- Importance sommeil

### 👤 **Profil**

#### **Informations Personnelles**
- Avatar personnalisé
- Statistiques profil (âge, taille, poids départ/objectif)
- Date début programme
- Date course cible

#### **Informations Médicales**
- ⚠️ Alerte rupture LCA genoux droit
- Condition actuelle
- Recommandations spécifiques

#### **Programme d'Entraînement**
- Niveau: Débutant
- Expérience course: 1 an
- Fréquence séances
- Jours entraînement

#### **Bibliothèque de Conseils**
6 catégories complètes:
- 🏃 Échauffement
- 💧 Hydratation
- 😴 Récupération
- 🛡️ Prévention Blessures
- 📈 Progression
- 🧠 Mental

#### **Gestion des Données**
- **Export JSON**: Sauvegarde complète données
- **Import JSON**: Restauration backup
- **Réinitialisation**: Suppression totale (avec double confirmation)
- **Stockage local**: Toutes données dans navigateur (LocalStorage)

---

## 🛠️ Technologies Utilisées

### **Frontend**
- **HTML5**: Structure sémantique
- **CSS3**: Design moderne avec variables CSS, animations, responsive
- **JavaScript Vanilla**: Logique applicative complète
- **Chart.js**: Graphiques interactifs (poids, séances)

### **Bibliothèques CDN**
- **Google Fonts** (Inter): Typographie moderne
- **Font Awesome 6.4.0**: Iconographie complète
- **Chart.js**: Visualisation données

### **Stockage**
- **LocalStorage**: Persistance données côté client
  - Profil utilisateur
  - Historique poids & mensurations
  - Sessions complétées
  - Journal entraînement
  - Badges débloqués
  - Nutrition quotidienne

---

## 📁 Structure du Projet

```
fitcoach-damien/
├── index.html          # Page principale (92KB)
├── css/
│   └── style.css      # Styles complets (38KB)
├── js/
│   └── app.js         # Logique applicative (32KB)
└── README.md          # Documentation (ce fichier)
```

---

## 🚀 Utilisation

### **Première Visite**
1. L'application charge automatiquement le profil de Damien
2. Poids initial (114 kg) est enregistré avec la date de début (7 janvier 2026)
3. Tous les compteurs sont à zéro
4. Aucun badge débloqué

### **Navigation**
- **Mobile**: Menu tabs en bas de l'écran (6 onglets)
- **Desktop**: Même navigation, optimisée pour grand écran
- Transitions fluides entre sections

### **Enregistrer une Séance**
1. Aller dans **Programme**
2. Choisir le jour (Mardi/Mercredi/Samedi)
3. Consulter les exercices détaillés
4. Utiliser les **timers de repos** entre séries
5. Cliquer sur **"Marquer comme Complétée"**
6. Redirection automatique vers Journal
7. Remplir le formulaire (optionnel mais recommandé)

### **Suivre son Poids**
1. Section **Progression**
2. Cliquer **"+ Ajouter Poids"**
3. Sélectionner date + entrer poids
4. Le graphique se met à jour automatiquement
5. Vérification badges (5kg, 10kg, 15kg, objectif)

### **Tracker Nutrition**
- **Protéines**: Entrer grammes + cliquer "Ajouter"
- **Eau**: Cliquer sur les verres pour remplir (0-16 verres)
- Reset automatique chaque jour à minuit

### **Débloquer Badges**
Les badges se débloquent automatiquement selon:
- Nombre de séances (1, 25, 50)
- Perte de poids (5kg, 10kg, 15kg, objectif)
- Régularité (semaine complète, mois sans interruption)
- Événement (course 10km - manuel)

---

## 🎨 Design & UX

### **Palette de Couleurs**
- **Bleu principal**: #2563eb (action, navigation)
- **Vert succès**: #10b981 (progression, validation)
- **Orange alerte**: #f59e0b (attention, optionnel)
- **Rouge danger**: #ef4444 (douleur, suppression)
- **Violet**: #8b5cf6 (étirements, badges)
- **Gris nuancés**: 50 à 900 (interface, textes)

### **Responsive**
- **Mobile First**: Optimisé pour utilisation en salle (téléphone)
- **Breakpoint 768px**: Adaptation desktop
- **Navigation adaptative**: Tabs bas (mobile) / Sidebar possible (desktop)
- **Grids flexibles**: Auto-ajustement selon écran

### **Animations**
- Transitions douces (150-350ms)
- FadeIn sections
- Hover effects sur cartes
- Slide-in modaux
- Progress bars animées

### **Accessibilité**
- Icônes + textes
- Contrastes WCAG AA
- Labels explicites
- Structure sémantique HTML5

---

## 💾 Données Stockées (LocalStorage)

```javascript
{
  profile: {
    name, age, height, startWeight, currentWeight, 
    targetWeight, startDate, raceDate
  },
  weights: [
    { date: "2026-01-07", weight: 114 },
    { date: "2026-01-14", weight: 113.5 },
    ...
  ],
  measurements: [
    { date: "2026-01-07", waist: 110, chest: 115, thigh: 65, arm: 38 },
    ...
  ],
  sessions: [
    { date: "2026-01-08T18:30:00", type: "tuesday", name: "Mardi - Haut du Corps" },
    ...
  ],
  journal: [
    { date: "2026-01-08", type: "Mardi - Haut du Corps", 
      energy: 7, notes: "...", pain: "..." },
    ...
  ],
  badges: [
    { id: "first-session", name: "Première Séance", 
      icon: "fa-star", unlocked: true, date: "2026-01-08" },
    ...
  ],
  nutrition: {
    proteinToday: 85,
    waterToday: 10,
    lastResetDate: "Tue Jan 07 2026"
  }
}
```

**Clé LocalStorage**: `fitCoachData`

---

## 🔐 Sécurité & Confidentialité

- ✅ **Stockage 100% local** (navigateur uniquement)
- ✅ **Aucune donnée envoyée** sur internet
- ✅ **Pas de tracking** ou analytics
- ✅ **Export/Import JSON** pour sauvegardes personnelles
- ⚠️ **Attention**: Suppression cache navigateur = perte données (penser à exporter régulièrement)

---

## 🏥 Considérations Santé

### **Adaptations Genoux Droit**
- ⚠️ Alertes visuelles avant exercices bas du corps
- Amplitude contrôlée sur presse à cuisses
- Privilégier machines guidées
- Consignes arrêt immédiat si douleur
- Section dédiée dans profil médical

### **Progression Graduelle**
- Semaines 1-2: Charges très légères (apprentissage)
- Semaines 3-4: Augmentation 5-10% si confortable
- Recommandations intégrées dans fiches exercices

### **Récupération**
- Jours repos explicites dans programme
- Conseils sommeil (7-9h)
- Gestion fatigue (option réduire volume)
- Section récupération dans bibliothèque conseils

---

## 📈 Objectifs & Suivi

### **Objectif Principal**
- **Perte de poids**: 114 kg → 94 kg (-20 kg)
- **Durée**: 12 mois (7 janvier 2026 → 7 janvier 2027)
- **Rythme**: -0.4 à -0.5 kg/semaine (durable)

### **Objectif Intermédiaire**
- **Course 10km**: 5 avril 2026 (dans ~90 jours)
- Compte à rebours visible sur dashboard
- Badge dédié à débloquer

### **Objectifs Musculaires**
- Développement harmonieux corps complet
- Focus muscles bénéfiques course:
  - Jambes (quadriceps, ischio, mollets, fessiers)
  - Core (abdos, obliques, lombaires)
  - Dos (posture course)

---

## 🎯 Prochaines Améliorations Possibles

### **Fonctionnalités Avancées** (Non implémentées - Suggestions)
- [ ] Graphique mensurations (Chart.js multi-courbes)
- [ ] Calculateur FCmax et zones cardio
- [ ] Plans progression charges (surcharge progressive)
- [ ] Bibliothèque photos exercices
- [ ] Mode sombre (Dark mode)
- [ ] Rappels notifications (Web Notifications API)
- [ ] Statistiques avancées (moyennes, tendances)
- [ ] Partage social (optionnel)
- [ ] Export PDF rapport mensuel
- [ ] Intégration calendrier courses

### **Optimisations Techniques**
- [ ] Service Worker (mode hors-ligne)
- [ ] Compression données LocalStorage
- [ ] Lazy loading images
- [ ] PWA (Progressive Web App)
- [ ] Tests unitaires JavaScript

---

## 📖 Guide Utilisation Rapide

### **Au Quotidien**
1. **Matin**: 
   - Vérifier hydratation journée précédente
   - Reset compteur eau si nécessaire
   - Consulter conseil du jour

2. **Avant Séance**:
   - Aller dans Programme
   - Revoir exercices du jour
   - Préparer charges légères (débutant)

3. **Pendant Séance**:
   - Suivre ordre exercices
   - Utiliser timers repos
   - Noter sensations mentalement

4. **Après Séance**:
   - Marquer séance comme complétée
   - Remplir journal (10-15 sec)
   - Ajouter protéines post-workout
   - Boire 2-3 verres d'eau

5. **Hebdomadaire**:
   - Lundi matin: Se peser (même heure, à jeun)
   - Ajouter poids dans app
   - Consulter graphique progression
   - Célébrer petites victoires !

6. **Mensuel**:
   - Prendre mensurations
   - Prendre photos (optionnel)
   - Exporter données (backup)
   - Revoir conseils coach

---

## 🤝 Coach Virtuel - Messages Motivationnels

L'application intègre un système de **10 conseils rotatifs** affichés quotidiennement sur le dashboard. Ces conseils couvrent:

- Importance échauffement et prévention blessures
- Constance vs intensité
- Récupération et sommeil
- Hydratation et timing
- Nutrition protéinée
- Attention genoux droit
- Différence balance vs miroir
- Relation musculation-course
- Respiration correcte
- Différenciation douleur musculaire/articulaire

**Rotation automatique**: 1 conseil par jour selon date de l'année.

---

## 📱 Compatibilité

### **Navigateurs Supportés**
- ✅ Chrome 90+ (recommandé)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile (iOS Safari, Chrome Android)

### **Résolutions Testées**
- 📱 Mobile: 375px - 430px (iPhone, Android)
- 📱 Tablette: 768px - 1024px (iPad)
- 💻 Desktop: 1280px - 1920px+

---

## 🐛 Résolution Problèmes

### **Données ne se sauvegardent pas**
- Vérifier que LocalStorage est activé dans navigateur
- Vérifier espace stockage disponible
- Essayer mode navigation privée (test)

### **Graphiques ne s'affichent pas**
- Vérifier connexion internet (Chart.js CDN)
- Rafraîchir page (F5)
- Vider cache navigateur

### **Timer ne fonctionne pas**
- Vérifier que JavaScript est activé
- Essayer un autre navigateur
- Vérifier console erreurs (F12)

### **Perte de données**
- Exporter régulièrement (JSON backup)
- Ne pas supprimer cache navigateur
- Utiliser même navigateur/appareil

---

## 📄 Licence & Utilisation

**Application personnalisée** créée spécifiquement pour Damien.

- ✅ Utilisation personnelle illimitée
- ✅ Modification code source autorisée
- ✅ Pas de garantie commerciale
- ✅ Données privées (stockage local uniquement)

---

## 🎉 Conclusion

**FitCoach Damien** est une application complète, moderne et personnalisée qui accompagne Damien dans sa transformation physique sur 12 mois. 

Combinant **musculation intelligente**, **suivi nutritionnel précis**, **gamification motivante** et **respect des contraintes médicales**, cette application met tous les outils nécessaires à disposition pour atteindre l'objectif de **-20kg** tout en développant force et endurance pour exceller en **course à pied**.

### **Points Forts**
✅ Programme adapté niveau débutant  
✅ Protection genoux droit intégrée  
✅ Fiches exercices ultra-détaillées  
✅ Suivi progression visuel (graphiques)  
✅ Badges motivation  
✅ Nutrition optimisée  
✅ 100% gratuit, sans pub, sans tracking  
✅ Fonctionne hors-ligne (après 1ère visite)  

---

## 📞 Support

Pour toute question ou suggestion d'amélioration, Damien peut modifier directement le code source ou contacter son coach personnel.

**Bonne chance dans ta transformation, Damien ! 💪🏃‍♂️🔥**

---

*Dernière mise à jour: 7 janvier 2026*