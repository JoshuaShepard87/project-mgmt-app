let logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1024px-GraphQL_Logo.svg.png';

export default function Header(){
    return (
        <nav className={'navbar bg-light mb-4 p-0'}>
            <div className={'container'}>
                <div className={'navbar-brand'} href={"/"}>
                    <div className={'d-flex'}>
                    <img src={logo} alt={"logo"} style={{width: 30, height: 30, marginRight: 5}}/>
                        <div>ProjectMgmt</div>
                    </div>
                </div>
            </div>
        </nav>
    )
}