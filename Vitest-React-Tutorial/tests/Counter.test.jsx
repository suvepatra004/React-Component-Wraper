import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom';

import React from 'react'

function Counter() {
    return (
        <div>Counter</div>
    )
}

export default Counter