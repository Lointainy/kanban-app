import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

/* Router */
import { BrowserRouter as Router } from 'react-router-dom'

/* Store */
import { Provider } from 'react-redux'
import { store } from '@store/store'

/* Fonts */
import '@fontsource/plus-jakarta-sans'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/700.css'

/* ICONS */
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEllipsisVertical,
  faPlus,
  faLayerGroup,
  faSun,
  faMoon,
  faCheck,
  faChevronDown,
  faRightLeft,
  faMinus,
  faEyeSlash,
  faBars,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faBars,
  faEllipsisVertical,
  faPlus,
  faLayerGroup,
  faSun,
  faMoon,
  faCheck,
  faChevronDown,
  faRightLeft,
  faMinus,
  faEyeSlash
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
