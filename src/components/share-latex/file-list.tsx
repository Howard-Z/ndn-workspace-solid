import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  IconButton
} from '@suid/material'
import {
  Folder as FolderIcon,
  Description as DescriptionIcon,
  FilePresent as FilePresentIcon,
  Delete as DeleteIcon,
} from '@suid/icons-material'
import { project } from '../../backend/models'
import { Link as RouterLink } from '@solidjs/router'
import { For, Match, Switch } from 'solid-js';

export default function FileList(props: {
  rootUri: string,
  subItems: string[],
  resolveItem: (id: string) => project.Item | undefined,
  deleteItem: (index: number) => void,
}) {
  const getItemIcon = (item?: project.Item) => (
    <Switch fallback={(<></>)}>
      <Match when={item?.kind === 'folder'}>
        <FolderIcon />
      </Match>
      <Match when={item?.kind === 'text'}>
        <DescriptionIcon />
      </Match>
      <Match when={item?.kind === 'xmldoc'}>
        <DescriptionIcon />
      </Match>
      <Match when={item?.kind === 'blob'}>
        <FilePresentIcon />
      </Match>
    </Switch>
  )

  const getItemLink = (item?: project.Item) => {
    const to = () => props.rootUri + '/' + item?.id
    return (<Link
      underline='hover'
      sx={{ display: 'flex', alignItems: 'left' }}
      color="inherit"
      component={RouterLink}
      href={to()}>
      {getItemIcon(item)}
      {item?.name}
    </Link>)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <For each={props.subItems}>{((itemId, i) =>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {getItemLink(props.resolveItem(itemId))}
              </TableCell>
              <TableCell align="right">
                <IconButton color='error' onClick={() => props.deleteItem(i())}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>)}
          </For>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
