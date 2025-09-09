import PokemonPage from 'src/pages/PokemonPage'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

test('contains h1 with name of pokemon', () => {
    render(<MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <PokemonPage />
    </MemoryRouter>)
})