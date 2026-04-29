#!/usr/bin/env node
/**
 * setup.js — Run this after `git submodule update --init`
 * It installs the UI kit's peer deps into the consumer repo
 * and adds the submodule as a local workspace dependency.
 *
 * Usage (from consumer repo root):
 *   node ui/scripts/setup.js
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const TAMAGUI_VERSION = '^2.0.0-rc.41'
const REACT_VERSION = '^19.0.0'
const REACT_NATIVE_VERSION = '^0.81.0'
const RN_WEB_VERSION = '^0.20.0'

const PEER_DEPS = {
  tamagui: TAMAGUI_VERSION,
  '@tamagui/core': TAMAGUI_VERSION,
  '@tamagui/config': TAMAGUI_VERSION,
  '@tamagui/themes': TAMAGUI_VERSION,
  react: REACT_VERSION,
  'react-dom': REACT_VERSION,
  'react-native': REACT_NATIVE_VERSION,
  'react-native-web': RN_WEB_VERSION,
}

function run(cmd) {
  console.log(`▶ ${cmd}`)
  execSync(cmd, { stdio: 'inherit' })
}

function detectPM() {
  if (fs.existsSync('yarn.lock')) return 'yarn'
  if (fs.existsSync('pnpm-lock.yaml')) return 'pnpm'
  return 'npm'
}

function installDeps(pm, deps) {
  const list = Object.entries(deps)
    .map(([k, v]) => `${k}@${v}`)
    .join(' ')
  const cmd =
    pm === 'yarn' ? `yarn add ${list}` : pm === 'pnpm' ? `pnpm add ${list}` : `npm install ${list}`
  run(cmd)
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const pm = detectPM()
console.log(`\n🎨 Setting up @aioz/cross-ui kit (package manager: ${pm})\n`)

// Install peer deps
installDeps(pm, PEER_DEPS)

// Add the local submodule package as a dependency
const consumerPkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
consumerPkg.dependencies = consumerPkg.dependencies ?? {}
consumerPkg.dependencies['@aioz/cross-ui'] =
  consumerPkg.dependencies['@aioz/cross-ui'] ?? 'file:./ui/packages/ui'
fs.writeFileSync('package.json', JSON.stringify(consumerPkg, null, 2) + '\n')
console.log('✅ Added @aioz/cross-ui to package.json')

// Re-install to link the local package
const installCmd = pm === 'yarn' ? 'yarn install' : pm === 'pnpm' ? 'pnpm install' : 'npm install'
run(installCmd)

console.log('\n✨ Done! You can now import from @aioz/cross-ui in your project.\n')
