# rinetd-admin

Simple REST API to manage routing rules and access policies for the [rinetd](https://github.com/samhocevar/rinetd) super server.

## Prerequsites
- Local rinetd server instance
- Node.js - v14.x and newer
- npm

## How to set up
1. Copy `config.dest.json` to `config.json`
2. Edit `config.json` to specify the local rinetd.conf file location.
3. `npm run start`

## Things to do
- Access policies, they are unsupported at the moment.

## REST API

`api/v1/add/[dport]/[addr]/[port]` - Adds a new entry to the config:
- **dport** - Remote port accessible from the outside network
- **addr** - Local address to redirect packets to
- **port** - Local port we receive packets at

`api/v1/del/[index]` - Removes a specific row:
- **index** - Row to delete from the config

`api/v1/list` - Lists all the config entries

## Note

**rinetd-admin** offers no security on its own. It is recommended to run it behind firewall only accessible from the intended local network.
It also works best with config fully managed by this service.

## License

Check [LICENSE.MD](LICENSE.MD)
