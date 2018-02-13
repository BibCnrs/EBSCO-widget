import extractFormulas from '../../../lib/services/extractFormulas';

describe('extractFormulas', () => {
    it('should return null if no inline formula', () => {
        assert.equal(extractFormulas('hello world'), null);
    });

    it('should return an array with formula delimited by $ separated from the rest of the text', () => {
        const text = "We consider the family of Lucas sequences uniquely determined by $U_{n+2}(k)=(4k+2)U_{n+1}(k) -U_n(k),$ with initial values $U_0(k)=0$ and $U_1(k)=1$ and $k\ge 1$ an arbitrary integer. For any integer $n\ge 1$ the discriminator function $\mathcal{D}_k(n)$ of $U_n(k)$ is defined as the smallest integer $m$ such that $U_0(k),U_1(k),\ldots,U_{n-1}(k)$ are pairwise incongruent modulo $m$. Numerical work of Shallit on $\mathcal{D}_k(n)$ suggests that it has a relatively simple characterization. In this paper we will prove that this is indeed the case by showing that for every $k\ge 1$ there is a constant $n_k$ such that ${\mathcal D}_{k}(n)$ has a simple characterization for every $n\ge n_k$. The case $k=1$ turns out to be fundamentally different from the case $k>1$.";
        assert.deepEqual(extractFormulas(text), [
            'We consider the family of Lucas sequences uniquely determined by ',
            { formula: 'U_{n+2}(k)=(4k+2)U_{n+1}(k) -U_n(k),' },
            ' with initial values ',
            { formula: 'U_0(k)=0' },
            ' and ',
            { formula: 'U_1(k)=1' },
            ' and ',
            { formula: 'k\ge 1' },
            ' an arbitrary integer. For any integer ',
            { formula: 'n\ge 1' },
            ' the discriminator function ',
            { formula: '\mathcal{D}_k(n)' },
            ' of ',
            { formula: 'U_n(k)' },
            ' is defined as the smallest integer ',
            { formula: 'm' },
            ' such that ',
            { formula: 'U_0(k),U_1(k),\ldots,U_{n-1}(k)' },
            ' are pairwise incongruent modulo ',
            { formula: 'm' },
            '. Numerical work of Shallit on ',
            { formula: '\mathcal{D}_k(n)' },
            ' suggests that it has a relatively simple characterization. In this paper we will prove that this is indeed the case by showing that for every ',
            { formula: 'k\ge 1' },
            ' there is a constant ',
            { formula: 'n_k' },
            ' such that ',
            { formula: '{\mathcal D}_{k}(n)' },
            ' has a simple characterization for every ',
            { formula: 'n\ge n_k' },
            '. The case ',
            { formula: 'k=1' },
            ' turns out to be fundamentally different from the case ',
            { formula: 'k>1' },
            '.',
        ]);
    });

    it('should ignore text with a single $', () => {
        assert.equal(extractFormulas('It costs 5000$, it is quite expensive'), null);
    });

    it('should ignore text with $ on separate lines', () => {
        assert.equal(extractFormulas('It costs 5000$, it is quite expensive. \n2000$ woulb be a better price'), null);
    });
})
