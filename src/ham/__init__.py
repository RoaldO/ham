from collections import namedtuple

Tile = namedtuple('Tile', 'type title width height color properties')
Tile.__new__.__defaults__ = (None, '', 1, 1, 'black', dict())
