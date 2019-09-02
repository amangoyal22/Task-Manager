//const x = require('')
test('trial', ()=>{
    const x = 10
    expect(x).toBe(10)
})

test('async',(done)=>{
    setTimeout(()=>{
        expect(1).toBe(1)
        done()
    },2000)
})