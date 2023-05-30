import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

/* Router */
import { BrowserRouter as Router } from 'react-router-dom'

/* Store */
import { store } from '@store/store'
import { Provider } from 'react-redux'

/* Fonts */
import '@fontsource/plus-jakarta-sans'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/700.css'

/* ICONS */
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars,
  faCheck,
  faChevronDown,
  faChevronUp,
  faCircleExclamation,
  faEllipsisVertical,
  faEyeSlash,
  faLayerGroup,
  faMinus,
  faMoon,
  faPlus,
  faRightLeft,
  faSun,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faBars,
  faEllipsisVertical,
  faPlus,
  faLayerGroup,
  faSun,
  faMoon,
  faCheck,
  faChevronUp,
  faChevronDown,
  faRightLeft,
  faMinus,
  faEyeSlash,
  faCircleExclamation,
  faTrash
)

/* Styles */
import '@styles/main.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
)
