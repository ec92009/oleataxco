# Olea Tax Co. email routing

Cloudflare Email Routing sends mail for `hello@oleataxco.com` to the
`oleataxco-hello-forwarder` Worker. The Worker forwards each message to both
verified destinations:

- `ec92009@gmail.com`
- `kellycohen11@gmail.com`

Deploy the Worker from the repository root:

```sh
env -u CLOUDFLARE_API_TOKEN npx --yes wrangler@latest deploy \
  --config cloudflare-email-routing/wrangler.jsonc
```

The Cloudflare Email Routing rule must match `hello@oleataxco.com` and use the
Worker action with `oleataxco-hello-forwarder` as its destination.
