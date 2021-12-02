import imgbg from '../../assets/madeira-cortada.png';
import parceiro1 from '../../assets/parceiros_logos_Prancheta 1.svg';
import parceiro2 from '../../assets/parceiros_logos-02.svg';
import parceiro3 from '../../assets/parceiros_logos-03.svg';
import parceiro4 from '../../assets/parceiros_logos-04.svg';
import parceiro5 from '../../assets/parceiros_logos-05.svg';

const Sobre = function () {
    return (<>
        <div className={"wrapper"}>
            <h1 className={"texto-vazado"}>SOBRE</h1>
            <div className={'texto-comum'} style={{marginBottom: 30}}>Somos um estúdio de arquitetura, design e fabricação<br/>digital, localizado em Capo Grande-MS</div>
            <div className={'texto-comum'} style={{marginBottom: 30}}>Nossa produção é divida em duas áreas: O desenvolvimento<br/>de produtos e a prestação de serviços.</div>
            <div className={'texto-comum'} style={{marginBottom: 30}}>A partir da fabricação digital pretendemos desenvolver<br/>uma linha de mobiliários minimalistas, autênticos por<br/>terem como diferencial:</div>
            <div className={'texto-comum'} style={{marginBottom: 30, fontWeight: 'bold', fontFamily: 'SerifaStd'}}><em>
                - Um design autoral e cuidadoso<br/>
                - Rápida produção<br/>
                - Rápida montagem e facilidade de transpoorte<br/>
                - Uma abordagem menos nociva ao meio ambiente<br/>
            </em></div>
            <div className={'texto-comum'} style={{marginBottom: 60}}>Para saber mais visite nosso <em style={{fontWeight: 'bold'}}>Instagram</em></div>
            <h1 className={"texto-vazado"}>APOIO</h1>
            <div>
                <div className={'imagem-sobre-apoio'}>
                    <img src={parceiro1}/>
                </div>
                <div className={'imagem-sobre-apoio'}>
                    <img src={parceiro2}/>
                </div>
                <div className={'imagem-sobre-apoio'}>
                    <img src={parceiro3}/>
                </div>
                <div className={'imagem-sobre-apoio'}>
                    <img src={parceiro4}/>
                </div>
            </div>
            <h1 className={"texto-vazado"}>PARCERIA</h1>
            <div>
                <div className={'imagem-sobre-apoio'}>
                    <img src={parceiro5}/>
                </div>
            </div>
        </div>
        <div className={'carrousel-box'} style={{marginTop: 100}}>
            <img src={imgbg} style={{width: '100%'}}/>
        </div>
    </>)
}

export default Sobre;