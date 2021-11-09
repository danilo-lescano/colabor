const Contato = function () {
    return (
        <div className={"wrapper"}>
            <h1 className={"texto-vazado"}>CONTATO</h1>
            <div className={'texto-comum'}>Entre em contato por What's App<br/>no número <span style={{fontWeight: 'bold'}}><em>+55 67 984247615</em></span></div>
            <a href={'https://wa.me/5567984247615'} target={'_blank'}>
                <button className={'clickable entrar-em-contato-btn'}>ENTRAR EM CONTATO</button>
            </a>
            <div className={'texto-comum'}>ou</div>
            <div className={'texto-comum'} style={{margin: '50px 0'}}>Envie um e-mail:</div>
            <input type={"email"} className={'left-navbar-input'} placeholder={'Email'} style={{fontSize: '1.2em'}}/>
            <div style={{margin: '30px 0 15px 0', fontSize: '1.8em', fontWeight: 'lighter'}}>Mensagem</div>
            <div className={'text-area-wrapper'}>
                <textarea className={'text-area'}/>
                <br/>
                <button className={'clickable btn-de-enviar'}>ENVIAR</button>
            </div>
        </div>
    )
}

export default Contato;
